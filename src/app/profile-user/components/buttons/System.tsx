import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

export function ButtonSystem() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    // Prevenir hidratación hasta que el componente esté montado
    if (!mounted) {
        return (
            <button
                type="button"
                className="flex flex-col gap-2 w-48 bg-surface-200 rounded-md cursor-pointer border shadow-sm group p-3 transition-colors border-strong hover:border-stronger hover:bg-surface-300"
            >
                <svg viewBox="0 0 163 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG content */}
                </svg>
                <div className="flex gap-2 w-full">
                    <div className="relative w-3 h-3 min-w-3 mt-0.5">
                        <div className="absolute w-3 h-3 border rounded-full transition-colors border-stronger group-hover:border-foreground-light"></div>
                    </div>
                    <label className="text-xs text-left text-light group-hover:text-foreground">
                        Sistema
                    </label>
                </div>
            </button>
        );
    }
    
    const seleccionado = theme === "system";
    return (
        <button
            type="button"
            role="radio"
            aria-checked={seleccionado}
            value="system"
            onClick={() => setTheme("system")}
            className={`flex flex-col gap-2 w-48 bg-surface-200 rounded-md cursor-pointer border shadow-sm group p-3 transition-colors ${seleccionado ? "ring-1 ring-border bg-selection border-foreground" : "border-strong hover:border-stronger hover:bg-surface-300"
                }`}>
            <svg viewBox="0 0 163 88" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_742_69895)"><rect x="0.742188" width="161.5" height="88" rx="6" fill="#1C1C1C"></rect><mask id="path-3-inside-1_742_69895" fill="white"><path d="M0.742188 6C0.742188 2.68629 3.42848 0 6.74219 0H13.7422V88H6.74219C3.42848 88 0.742188 85.3137 0.742188 82V6Z"></path></mask><path d="M0.742188 6C0.742188 2.68629 3.42848 0 6.74219 0H13.7422V88H6.74219C3.42848 88 0.742188 85.3137 0.742188 82V6Z" fill="#1C1C1C"></path><path d="M0.742188 0H13.7422H0.742188ZM13.7422 88H0.742188H13.7422ZM0.742188 88V0V88ZM14.7422 0V88H12.7422V0H14.7422Z" fill="#2E2E2E" mask="url(#path-3-inside-1_742_69895)"></path><mask id="path-5-inside-2_742_69895" fill="white"><path d="M156.242 -2.62268e-07C159.556 -1.17421e-07 162.242 2.68629 162.242 6L162.242 13L13.7422 13L13.7422 -6.49114e-06L156.242 -2.62268e-07Z"></path></mask><path d="M156.242 -2.62268e-07C159.556 -1.17421e-07 162.242 2.68629 162.242 6L162.242 13L13.7422 13L13.7422 -6.49114e-06L156.242 -2.62268e-07Z" fill="#1C1C1C"></path><path d="M162.242 0L162.242 13L162.242 0ZM13.7422 13L13.7422 -6.49114e-06L13.7422 13ZM13.7422 -6.49114e-06L162.242 0L13.7422 -6.49114e-06ZM162.242 14L13.7422 14L13.7422 12L162.242 12L162.242 14Z" fill="#2E2E2E" mask="url(#path-5-inside-2_742_69895)"></path><rect x="44.7552" y="21.5" width="86.4738" height="23.5" rx="2.5" fill="#232323" stroke="#2E2E2E"></rect><rect x="44.7552" y="51.5" width="86.4738" height="23.5" rx="2.5" fill="#232323" stroke="#2E2E2E"></rect><rect x="52.9406" y="28" width="19.2318" height="1.5" rx="0.75" fill="#A0A0A0"></rect><rect x="52.9406" y="56.5" width="19.2318" height="1.5" rx="0.75" fill="#A0A0A0"></rect><rect x="78.3762" y="28" width="19.2318" height="1.5" rx="0.75" fill="#EDEDED"></rect><rect x="78.3762" y="56.5" width="19.2318" height="1.5" rx="0.75" fill="#EDEDED"></rect><rect x="78.3762" y="33.25" width="44.0471" height="1.5" rx="0.75" fill="#EDEDED"></rect><rect x="78.3762" y="61.75" width="44.0471" height="1.5" rx="0.75" fill="#EDEDED"></rect><rect x="18.4922" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#3ECF8E"></rect><rect x="44.2552" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#707070"></rect><rect x="69.5052" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#707070"></rect><rect x="101.923" y="28" width="20.5" height="1.5" rx="0.75" fill="#FFB224"></rect><rect x="5.36719" y="4.625" width="3.75" height="3.75" rx="1" fill="#707070"></rect><rect x="5.36719" y="13.375" width="3.75" height="3.75" rx="1" fill="#707070"></rect><rect x="5.36719" y="20.875" width="3.75" height="3.75" rx="1" fill="#707070"></rect><rect x="5.36719" y="28.375" width="3.75" height="3.75" rx="1" fill="#707070"></rect><rect x="5.36719" y="35.875" width="3.75" height="3.75" rx="1" fill="#707070"></rect><rect x="5.36719" y="78.875" width="3.75" height="3.75" rx="1" fill="#707070"></rect><mask id="mask0_742_69895" maskUnits="userSpaceOnUse" x="32" y="0" width="131" height="88" className="mask-type-alpha"><path d="M130.534 2.34842e-05L32.4507 88H162.131V0L130.534 2.34842e-05Z" fill="black"></path></mask><g mask="url(#mask0_742_69895)"><rect x="0.742188" width="161.5" height="88" fill="#F8F9FA"></rect><mask id="path-27-inside-3_742_69895" fill="white"><path d="M156.242 -2.62268e-07C159.556 -1.17421e-07 162.242 2.68629 162.242 6L162.242 13L13.7422 13L13.7422 -6.49114e-06L156.242 -2.62268e-07Z"></path></mask><path d="M156.242 -2.62268e-07C159.556 -1.17421e-07 162.242 2.68629 162.242 6L162.242 13L13.7422 13L13.7422 -6.49114e-06L156.242 -2.62268e-07Z" fill="#F8F9FA"></path><path d="M162.242 0L162.242 13L162.242 0ZM13.7422 13L13.7422 -6.49114e-06L13.7422 13ZM13.7422 -6.49114e-06L162.242 0L13.7422 -6.49114e-06ZM162.242 14L13.7422 14L13.7422 12L162.242 12L162.242 14Z" fill="#E6E8EB" mask="url(#path-27-inside-3_742_69895)"></path><rect x="44.7552" y="21.5" width="86.4738" height="23.5" rx="2.5" fill="#FCFCFC" stroke="#E6E8EB"></rect><rect x="44.7552" y="51.5" width="86.4738" height="23.5" rx="2.5" fill="#FCFCFC" stroke="#E6E8EB"></rect><rect x="52.9406" y="28" width="19.2318" height="1.5" rx="0.75" fill="#525252"></rect><rect x="52.9406" y="56.5" width="19.2318" height="1.5" rx="0.75" fill="#525252"></rect><rect x="78.3762" y="28" width="19.2318" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="78.3762" y="56.5" width="19.2318" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="78.3762" y="33.25" width="44.0471" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="78.3762" y="61.75" width="44.0471" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="18.4922" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#3FCF8E"></rect><rect x="44.2552" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#B2B2B2"></rect><rect x="69.5052" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#B2B2B2"></rect><rect x="101.923" y="28" width="20.5" height="1.5" rx="0.75" fill="#FFB224"></rect></g></g><rect x="1.24219" y="0.5" width="160.5" height="87" rx="5.5" stroke="#2E2E2E"></rect><defs><clipPath id="clip0_742_69895"><rect x="0.742188" width="161.5" height="88" rx="6" fill="white"></rect></clipPath></defs></svg>
            <div className="flex gap-2 w-full">
                <div className="relative w-3 h-3 min-w-3 mt-0.5">
                    <span className={`absolute w-[10px] h-[10px] left-[1px] top-[1px] border rounded-full ${seleccionado ? "bg-foreground ring-foreground border-background-surface-300" : ""}`}></span>
                    <div className={`absolute w-3 h-3 border rounded-full transition-colors ${seleccionado ? "border-foreground" : "border-stronger group-hover:border-foreground-light"}`}></div>
                </div>
                <label htmlFor="system" className={`text-xs text-left ${seleccionado ? "text-foreground" : "text-light group-hover:text-foreground"}`}>
                    Sistema
                </label>
            </div>
        </button>
    )
}