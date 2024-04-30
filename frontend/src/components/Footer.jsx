import logoDark from "../assets/logoDark.png"
export function Footer()
{
    return <div className="w-screen h-72 bg-[#1c1d1f]">
        <div className="flex justify-between">
            <div className="flex w-1/2 justify-around">
                <TextComponent text1={'Learn Wise Business'} text2 = {'Teach on LearnWise'} text3 = {'Get the app'} text4 = {'About us'} text5 = {'Contact us'}></TextComponent>
                <TextComponent text1={'Careers'} text2 = {'Blog'} text3 = {'Help and Support'} text4 = {'Affiliate'} text5 = {'Investors'}></TextComponent>
                <TextComponent text1={'Terms'} text2 = {'Privacy policy'} text3 = {'Cookie settings'} text4 = {'Sitemap'} text5 = {'Contact us'}></TextComponent>
            </div>
            <button className="mr-20 mt-10 border border-white px-4 py-1 h-10  bg-[#1c1d1f] text-white font-semibold hover:bg-gray-800">
                English
            </button>
        </div>
        <div className="w-screen flex justify-between">
            <div className=" h-10 mt-16 ml-16">
                <img src={logoDark}  className="z-10 w-28"/>
            </div>
            <div className="mr-12 mt-20">
            <h1 className="text-white font-normal  text-sm hover:underline">2024 Learn Wise, Inc.</h1>
            </div>
        </div>
    </div>
}

function TextComponent({text1, text2, text3, text4, text5})
{
    return <div className="p-2 mt-5">
        <h1 className="text-white font-medium hover:underline">{text1}</h1>
        <h1 className="text-white font-medium hover:underline">{text2}</h1>
        <h1 className="text-white font-medium hover:underline">{text3}</h1>
        <h1 className="text-white font-medium hover:underline">{text4}</h1>
        <h1 className="text-white font-medium hover:underline">{text5}</h1>
    </div>
}