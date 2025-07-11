import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ButtonLight() {
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
                className="flex flex-col gap-2 w-48 bg-surface-200 rounded-md border cursor-pointer shadow-sm group p-3 transition-colors border-strong hover:border-stronger hover:bg-surface-300"
            >
                <svg viewBox="0 0 162 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG content */}
                </svg>
                <div className="flex gap-2 w-full">
                    <div className="relative w-3 h-3 min-w-3 mt-0.5">
                        <div className="absolute w-3 h-3 border rounded-full transition-colors border-stronger group-hover:border-foreground-light"></div>
                    </div>
                    <label className="text-xs text-left text-light group-hover:text-foreground">
                        Claro
                    </label>
                </div>
            </button>
        );
    }
    
    const seleccionado = theme === "light";
  
    return (
        <button 
        type="button" 
        role="radio" 
        aria-checked={seleccionado} 
        value="light" 
        onClick={() =>setTheme("light")}
        className={`flex flex-col gap-2 w-48 bg-surface-200 rounded-md border cursor-pointer shadow-sm group p-3 transition-colors ${
            seleccionado ? "ring-1 ring-border bg-selection border-foreground" : "border-strong hover:border-stronger hover:bg-surface-300"
          }`}>
            <svg viewBox="0 0 162 88" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_701_65608)"><rect x="0.242188" width="161.5" height="88" rx="6" fill="#F8F9FA"></rect><mask id="path-3-inside-1_701_65608" fill="white"><path d="M0.242188 6C0.242188 2.68629 2.92848 0 6.24219 0H13.2422V88H6.24219C2.92848 88 0.242188 85.3137 0.242188 82V6Z"></path></mask><path d="M0.242188 6C0.242188 2.68629 2.92848 0 6.24219 0H13.2422V88H6.24219C2.92848 88 0.242188 85.3137 0.242188 82V6Z" fill="#F8F9FA"></path><path d="M0.242188 0H13.2422H0.242188ZM13.2422 88H0.242188H13.2422ZM0.242188 88V0V88ZM14.2422 0V88H12.2422V0H14.2422Z" fill="#E6E8EB" mask="url(#path-3-inside-1_701_65608)"></path><mask id="path-5-inside-2_701_65608" fill="white"><path d="M155.742 -2.62268e-07C159.056 -1.17421e-07 161.742 2.68629 161.742 6L161.742 13L13.2422 13L13.2422 -6.49114e-06L155.742 -2.62268e-07Z"></path></mask><path d="M155.742 -2.62268e-07C159.056 -1.17421e-07 161.742 2.68629 161.742 6L161.742 13L13.2422 13L13.2422 -6.49114e-06L155.742 -2.62268e-07Z" fill="#F8F9FA"></path><path d="M161.742 0L161.742 13L161.742 0ZM13.2422 13L13.2422 -6.49114e-06L13.2422 13ZM13.2422 -6.49114e-06L161.742 0L13.2422 -6.49114e-06ZM161.742 14L13.2422 14L13.2422 12L161.742 12L161.742 14Z" fill="#E6E8EB" mask="url(#path-5-inside-2_701_65608)"></path><rect x="44.2552" y="21.5" width="86.4738" height="23.5" rx="2.5" fill="#FCFCFC" stroke="#E6E8EB"></rect><rect x="44.2552" y="51.5" width="86.4738" height="23.5" rx="2.5" fill="#FCFCFC" stroke="#E6E8EB"></rect><rect x="52.4406" y="28" width="19.2318" height="1.5" rx="0.75" fill="#525252"></rect><rect x="52.4406" y="56.5" width="19.2318" height="1.5" rx="0.75" fill="#525252"></rect><rect x="77.8762" y="28" width="19.2318" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="77.8762" y="56.5" width="19.2318" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="77.8762" y="33.25" width="44.0471" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="77.8762" y="61.75" width="44.0471" height="1.5" rx="0.75" fill="#11181C"></rect><rect x="17.9922" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#3FCF8E"></rect><rect x="43.7552" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#B2B2B2"></rect><rect x="69.0052" y="4.625" width="20.5" height="3.75" rx="1.875" fill="#B2B2B2"></rect><rect x="101.423" y="28" width="20.5" height="1.5" rx="0.75" fill="#FFB224"></rect><rect x="4.86719" y="4.625" width="3.75" height="3.75" rx="1" fill="#B2B2B2"></rect><rect x="4.86719" y="13.375" width="3.75" height="3.75" rx="1" fill="#B2B2B2"></rect><rect x="4.86719" y="20.875" width="3.75" height="3.75" rx="1" fill="#B2B2B2"></rect><rect x="4.86719" y="28.375" width="3.75" height="3.75" rx="1" fill="#B2B2B2"></rect><rect x="4.86719" y="35.875" width="3.75" height="3.75" rx="1" fill="#B2B2B2"></rect><rect x="4.86719" y="78.875" width="3.75" height="3.75" rx="1" fill="#B2B2B2"></rect></g><rect x="0.742188" y="0.5" width="160.5" height="87" rx="5.5" stroke="#E6E8EB"></rect><defs><clipPath id="clip0_701_65608"><rect x="0.242188" width="161.5" height="88" rx="6" fill="white"></rect></clipPath></defs></svg>
            <div className="flex gap-2 w-full">
        <div className="relative w-3 h-3 min-w-3 mt-0.5">
          <span className={`absolute w-[10px] h-[10px] left-[1px] top-[1px] border rounded-full ${seleccionado ? "bg-foreground ring-foreground border-background-surface-300" : ""}`}></span>
          <div className={`absolute w-3 h-3 border rounded-full transition-colors ${seleccionado ? "border-foreground" : "border-stronger group-hover:border-foreground-light"}`}></div>
        </div>
        <label htmlFor="system" className={`text-xs text-left ${seleccionado ? "text-foreground" : "text-light group-hover:text-foreground"}`}>
          Claro
        </label>
      </div></button>
    )
}