import { ChevronFirst, ChevronLast, MoreVertical, X, Menu, Power, Copyright } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ModalLogout } from "../configs/ModalLogout";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    return (
        <>
            <aside className="h-screen bg-gray-100 text-gray-900">
                <nav className="h-full flex flex-col text-gray-900 border-r border-gray-300 shadow-sm px-2 justify-start">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <div className="flex gap-3 items-end">
                            {/* <img src={logo} className={`overflow-hidden duration-500 ease-out rounded-full  ${expanded ? "w-14" : "w-0"}`} /> */}
                            <h1 className={`duration-500 ease-out overflow-hidden transition-all text-3xl font-bold ${expanded ? "w-44" : "w-0"}`}>CrossFit Inc.</h1>
                        </div>
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300">
                            {expanded ? <X /> : <Menu />}
                        </button>
                    </div>

                    <div className="mt-10 pt-4 border-t border-gray-300">
                        <span className="ml-3 h-8 items-center flex">
                            MENU
                        </span>

                        <SidebarContext.Provider value={{ expanded }}>
                            <ul className="flex-1 px-3 border-b border-t border-gray-300 py-6 mt-4 mb-5">{children}</ul>
                        </SidebarContext.Provider>
                    </div>

                    <div className="border-t flex p-3 mt-8 2xl:mt-20 border-gray-300 cursor-pointer">
                        {/* <img src={profile} className="w-10 h-10 rounded-md" /> */}
                        <Power className="ml-2.5" size={20} />
                        <div className={`flex justify-between items-center overflow-hidden cursor-pointer transition-all ${expanded ? "w-48 ml-3" : "w-0"}`}>
                            <div className="">
                                <ModalLogout />
                            </div>
                        </div>
                    </div>

                    <div className="absolute flex items-center bottom-5 h-10 p-3">
                        {/* <img src={profile} className="w-10 h-10 rounded-md" /> */}
                        <Copyright className="ml-2.5" size={20} />
                        <div className={`overflow-hidden h-5 ${expanded ? "w-auto ml-3" : "w-0"}`}>
                            <div className="leading-4 text-lg">
                                <h4>Centro de Acopio Sena</h4>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export function SidebarItem({ nav, icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);
    const { pathname } = useLocation();
    const isActive = pathname.startsWith(nav);

    return (
        <Link to={nav}>
            <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer group transition-colors duration-75  ${isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}>
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-48 ml-3" : "w-0"}`}>{text}</span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>
                )}

                {!expanded && (
                    <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-200 text-gray-900 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                        {text}
                    </div>
                )}
            </li>
        </Link>
    );
}
