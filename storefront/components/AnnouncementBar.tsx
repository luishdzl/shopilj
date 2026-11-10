export function AnnouncementBar() {
  return (
    <div className="bg-[var(--ink)] text-white">
      <div className="container flex h-9 items-center justify-center gap-6 overflow-hidden text-[11px] font-medium uppercase tracking-[0.16em]">
        <span className="hidden sm:inline">Envío gratis desde 25 €</span>
        <span className="text-white/40">•</span>
        <span>Suscripción con hasta 20 % de descuento</span>
        <span className="text-white/40">•</span>
        <span className="hidden md:inline">Garantía de 30 días</span>
      </div>
    </div>
  );
}