// Fallbacks são só pra dev local. Em produção: API_URL = crm-backend em
// https://pukacrm.duckdns.org; APP_URL = crm-frontend em
// https://puka-crm-web.vercel.app (nenhum dos dois tem domínio próprio ainda).
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:5173";

export interface CreateCompanyPayload {
  name: string;
  slug: string;
  email: string;
  phone: string;
  legal_name?: string;
  // CPF ou CNPJ, com ou sem pontuação — obrigatório desde 2026-08-04,
  // o Asaas exige documento do cliente pra criar a assinatura de verdade.
  document: string;
  owner_full_name: string;
  owner_email: string;
  owner_password: string;
}

export interface CompanyRead {
  id: string;
  name: string;
  slug: string;
  email: string;
  status: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;

  constructor(status: number, message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

// FastAPI valida com Pydantic e devolve 422 no formato
// { detail: [{ loc: ["body", "campo"], msg: "...", type: "..." }] }.
// Erros de negócio (ex.: slug duplicado) costumam vir como
// { detail: "mensagem" } com 409/400.
function parseErrorBody(status: number, body: unknown): ApiError {
  if (body && typeof body === "object" && "detail" in body) {
    const detail = (body as { detail: unknown }).detail;

    if (typeof detail === "string") {
      return new ApiError(status, detail);
    }

    if (Array.isArray(detail)) {
      const fieldErrors: Record<string, string> = {};
      for (const item of detail) {
        if (
          item &&
          typeof item === "object" &&
          "loc" in item &&
          "msg" in item &&
          Array.isArray((item as { loc: unknown }).loc)
        ) {
          const loc = (item as { loc: unknown[] }).loc;
          const field = String(loc[loc.length - 1]);
          fieldErrors[field] = String((item as { msg: unknown }).msg);
        }
      }
      const message =
        Object.values(fieldErrors)[0] ?? "Não foi possível validar os dados enviados.";
      return new ApiError(status, message, fieldErrors);
    }
  }

  return new ApiError(status, "Não foi possível concluir o cadastro. Tente novamente.");
}

export async function createCompany(
  payload: CreateCompanyPayload
): Promise<CompanyRead> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw parseErrorBody(res.status, body);
  }

  return res.json();
}

export function loginUrl(email: string): string {
  const url = new URL("/login", APP_URL);
  url.searchParams.set("email", email);
  return url.toString();
}
