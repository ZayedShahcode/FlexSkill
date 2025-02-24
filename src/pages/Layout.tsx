import { Outlet,Link } from "react-router-dom"

export default function Layout(){
    
    return(
        <div >
        <nav className="min-h-[12vh] pt-3 px-2 ">
            <main className="h-full flex items-center justify-between px-4 bg-[#F8F8FF] border border-black rounded-3xl">
                <h1 className="text-4xl md:text-5xl md:tracking-wider leading-10 pl-8">Flex Skill</h1>
                <div className="flex gap-4">
                    <Link to='/login'><button className="w-16 h-10 md:w-20 md:h-10 md:text-xl border border-black text-medium font-semibold rounded-xl hover:bg-[#6b6966] hover:text-black">Login</button></Link>
                    <Link to='/signup'><button className="w-16 h-10  md:w-20 md:h-10 md:text-xl bg-gray-800 text-white font-semibold rounded-xl hover:bg-[#6b6966] hover:text-black">Signup</button></Link>
                </div>
            </main>
        </nav>
        <Outlet/>
        
        </div>

    )
}