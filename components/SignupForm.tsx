"use client";

import { useState } from "react";
import { ApiError, createCompany, loginUrl } from "@/lib/api";

interface FormState {
  name: string;
  slug: string;
  email: string;
  phone: string;
  legal_name: string;
  document: string;
  owner_full_name: string;
  owner_email: string;
  owner_password: string;
}

const initialState: FormState = {
  name: "",
  slug: "",
  email: "",
  phone: "",
  legal_name: "",
  document: "",
  owner_full_name: "",
  owner_email: "",
  owner_password: "",
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (form.name.trim().length < 2 || form.name.trim().length > 150) {
    errors.name = "Informe o nome da empresa (2 a 150 caracteres).";
  }
  if (!/^[a-z0-9-]{2,100}$/.test(form.slug)) {
    errors.slug = "Use só letras minúsculas, números e hífen (2 a 100 caracteres).";
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "Informe um e-mail válido pra empresa.";
  }
  if (form.phone.trim().length < 8 || form.phone.trim().length > 25) {
    errors.phone = "Informe um telefone válido (8 a 25 caracteres).";
  }
  const documentDigits = form.document.replace(/\D/g, "");
  if (documentDigits.length !== 11 && documentDigits.length !== 14) {
    errors.document = "Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.";
  }
  if (form.owner_full_name.trim().length < 2 || form.owner_full_name.trim().length > 150) {
    errors.owner_full_name = "Informe seu nome completo (2 a 150 caracteres).";
  }
  if (!/^\S+@\S+\.\S+$/.test(form.owner_email)) {
    errors.owner_email = "Informe um e-mail válido de login.";
  }
  if (form.owner_password.length < 8) {
    errors.owner_password = "A senha precisa ter no mínimo 8 caracteres.";
  }

  return errors;
}

export default function SignupForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [slugEdited, setSlugEdited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function updateField<K extends keyof FormState>(field: K, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !slugEdited) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await createCompany({
        name: form.name.trim(),
        slug: form.slug.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        legal_name: form.legal_name.trim() || undefined,
        document: form.document.trim(),
        owner_full_name: form.owner_full_name.trim(),
        owner_email: form.owner_email.trim(),
        owner_password: form.owner_password,
      });
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors((prev) => ({ ...prev, ...err.fieldErrors }));
        setSubmitError(err.message);
      } else {
        setSubmitError("Não foi possível concluir o cadastro. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const redirectUrl = loginUrl(form.owner_email);
    return (
      <div className="notch-both border border-brand-200 bg-card p-8 text-center dark:border-brand-800">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
          <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="mt-4 text-xl font-semibold">Empresa cadastrada!</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Agora é só entrar com o e-mail <strong>{form.owner_email}</strong> pra
          começar a configurar o atendimento.
        </p>
        <a
          href={redirectUrl}
          className="btn-cut mt-6 inline-block bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Ir para o login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground">Sobre a empresa</legend>

        <Field label="Nome da empresa" error={errors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="Academia Vitalize"
          />
        </Field>

        <Field
          label="Identificador (slug)"
          error={errors.slug}
          hint="Usado na URL da sua empresa — só letras minúsculas, números e hífen."
        >
          <input
            type="text"
            value={form.slug}
            onChange={(e) => {
              setSlugEdited(true);
              updateField("slug", slugify(e.target.value));
            }}
            className={inputClass(!!errors.slug)}
            placeholder="academia-vitalize"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="E-mail da empresa" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass(!!errors.email)}
              placeholder="contato@suaempresa.com"
            />
          </Field>

          <Field label="Telefone" error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={inputClass(!!errors.phone)}
              placeholder="(11) 99999-9999"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Razão social" optional error={errors.legal_name}>
            <input
              type="text"
              value={form.legal_name}
              onChange={(e) => updateField("legal_name", e.target.value)}
              className={inputClass(!!errors.legal_name)}
            />
          </Field>

          <Field
            label="CPF ou CNPJ"
            error={errors.document}
            hint="Sem CNPJ ainda? Pode usar seu CPF."
          >
            <input
              type="text"
              value={form.document}
              onChange={(e) => updateField("document", e.target.value)}
              className={inputClass(!!errors.document)}
              placeholder="000.000.000-00"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground">Sua conta de acesso</legend>

        <Field label="Seu nome completo" error={errors.owner_full_name}>
          <input
            type="text"
            value={form.owner_full_name}
            onChange={(e) => updateField("owner_full_name", e.target.value)}
            className={inputClass(!!errors.owner_full_name)}
          />
        </Field>

        <Field label="E-mail de login" error={errors.owner_email}>
          <input
            type="email"
            value={form.owner_email}
            onChange={(e) => updateField("owner_email", e.target.value)}
            className={inputClass(!!errors.owner_email)}
          />
        </Field>

        <Field label="Senha" error={errors.owner_password} hint="Mínimo de 8 caracteres.">
          <input
            type="password"
            value={form.owner_password}
            onChange={(e) => updateField("owner_password", e.target.value)}
            className={inputClass(!!errors.owner_password)}
          />
        </Field>
      </fieldset>

      {submitError && (
        <p className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-cut w-full bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm shadow-brand-600/30 transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Criar conta grátis"}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 ${
    hasError ? "border-danger" : "border-border"
  }`;
}

function Field({
  label,
  hint,
  error,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">
        {label}
        {optional && <span className="ml-1 text-xs font-normal text-muted-foreground">(opcional)</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </label>
  );
}
