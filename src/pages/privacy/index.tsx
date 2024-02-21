import Up from "@/motions/up";


function Privacy () {
    return (
        <div className="flex flex-col gap-20">
            <div className="border-b-2 border-zinc-800 mt-1">
                <div className="container pl-4 pr-4 md:pl-0 md:pr-0 mx-auto pb-3 flex items-center justify-around">
                    <h1 className="text-2xl">Privacy, terms and conditions.</h1>
                </div>
            </div>
            <h3 className="text-xl mb-2 md:mb-5 ml-[10%]">
                Open source project. <br></br>
                No personal information used. <br></br>
                Developed by Javier Cuenca Gento.
            </h3>
        </div>
    );
}

export default Privacy;