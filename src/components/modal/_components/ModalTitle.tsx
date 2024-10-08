export function ModalTitleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-12 flex-col items-center justify-center gap-2 Tablet:min-h-[66px] Tablet:min-w-[360px] ">
      {children}
    </div>
  );
}

export function ModalTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-[216px] text-center text-Primary Text-l-Bold Tablet:Text-xl-Bold">
      {children}
    </div>
  );
}

export function ModalDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-center Text-m-Medium">{children}</div>;
}
