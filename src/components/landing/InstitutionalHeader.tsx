import logoSeducPi from "@/assets/seduc-piaui-lockup.jpg";

export function InstitutionalHeader() {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <img
          src={logoSeducPi}
          alt="Secretaria da Educação — SEDUC · Governo do Piauí. Aqui tem trabalho. Aqui tem futuro."
          className="h-12 w-auto sm:h-14"
        />
      </div>
    </div>
  );
}
