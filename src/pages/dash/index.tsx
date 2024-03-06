import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { useForm } from "react-hook-form";
import { ScoreSchema } from "@/schema/score.schema";

import { FilterScoreInput } from "@/schema/score.schema";

import Loader from "@/motions/loader";
import CardDash from "@/components/carddash";
import CardDashSkeleton from "@/components/carddash/skeleton";
import CardUser from "@/components/carduser";
import DashboardLayout from "@/layout/dashboard";

import { BiCodeAlt, BiDesktop, BiMobile, BiRocket } from "react-icons/bi";

import Alert from "@/ui/alert";
import { Button } from "@/ui";
import { Dropdown, DropdownItem } from "@/ui/dropdown";
import { BsAlarm, BsRocketTakeoff, BsAirplane, BsCarFront, BsScooter, BsKeyboard, BsChatRightQuote } from "react-icons/bs";
import { GiSpain } from "react-icons/gi";
import { RiEnglishInput } from "react-icons/ri";
import { TbBrandJavascript, TbBrandPython, TbGoGame } from "react-icons/tb";
import Up from "@/motions/up";

const Dashboard = () => {
    const { register } = useForm<FilterScoreInput>();
    const [filter, setFilter] = useState("");
    const [scores, setScores] = useState<ScoreSchema[]>([]);
    const [filteredScores, setFilteredScores] = useState<ScoreSchema[]>(scores);
    const [searchTime, setSearchTime] = useState("all_time");
    const [searchType, setSearchType] = useState("");
    const [searchDuration, setSearchDuration] = useState('0');
    const [searchDevice, setSearchDevice] = useState("All");

    const avatar_image = "/img/avatar.png";
    const { data: scoresData, isLoading, error } = trpc.links.getScores.useQuery({ filter });

    if (error) {
        return (
            <Alert>
                <p>{error.message}</p>
            </Alert>
        );
    }

    useEffect(() => {
        const filt_scores = scoresData?.filter((score) => {
            let type_scores = score.gameType.toLowerCase().includes(searchType.toLowerCase());
            switch(searchDuration) {
                case '30':
                    type_scores = score.gameDuration === '30';
                    break;

                case '45':
                    type_scores = score.gameDuration === '45';
                    break;

                case '60':
                    type_scores = score.gameDuration === '60';
                    break;

                case '120':
                    type_scores = score.gameDuration === '120';
                    break;

                default:
                    break;
            }

            switch(searchDevice) {
                case "PC":
                    type_scores = score.mobile === false;
                    break;

                case "Mobile":
                    type_scores = score.mobile === true;
                    break;

                default:
                    break;
            }

            if (searchTime === 'last_day') {
                const lastDay = new Date();
                lastDay.setHours(lastDay.getHours() - 24);
                return type_scores && new Date(score.createdAt) > lastDay;
            }

            return type_scores;
        });

        // @ts-ignore
        setFilteredScores(filt_scores);
    }, [scores, searchTime, searchType, searchDuration, searchDevice]);

    if (!scoresData) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center">
                <p className="mb-2 text-primary">Loading your scores...</p>
                <Loader />
            </div>
        );
    }

    if (scores.length === 0 && scoresData.length > 0) {
        setScores(scoresData as ScoreSchema[]);
    }

    return (
        <DashboardLayout>
            <div className="flex gap-0 lg:gap-6 my-4">
                <div className="flex gap-0 lg:gap-8 w-full">
                    <div className="flex gap-0 lg:gap-2 m-auto">
                        <Button
                            className={searchTime === 'all_time' ? "bg-transparent text-orange-400 text-xs lg:text-base" : "bg-transparent text-primary text-xs lg:text-base"}
                            icon={<BiCodeAlt size={window.innerWidth > 420 ? 26 : 14} />}
                            onClick={() => { setSearchTime('all_time') }}
                        >
                            All time
                        </Button>
                        <Button
                            className={searchTime === 'all_time' ? "bg-transparent text-primary text-xs lg:text-base" : "bg-transparent text-orange-400 text-xs lg:text-base"}
                            icon={<BiCodeAlt size={window.innerWidth > 420 ? 26 : 14} />}
                            onClick={() => { setSearchTime('last_day') }}
                        >
                            Last day
                        </Button>
                    </div>
                    <div className="flex gap-0 lg:gap-2 m-auto">
                        <Dropdown title={`Duration ${searchDuration === '0' ? 'all' : searchDuration}`} className="bg-transparent text-primary text-xs lg:text-base m-auto mt-1" icon={ <BsAlarm size={window.innerWidth > 420 ? 22 : 14} /> }>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbGoGame className="text-primary" size={17} />} onClick={() => setSearchDuration('0')}>
                                <p className="text-primary">All</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsRocketTakeoff className="text-primary" size={17} />} onClick={() => setSearchDuration('30')}>
                                <p className="text-primary">30 seconds</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsAirplane className="text-primary" size={17} />} onClick={() => setSearchDuration('45')}>
                                <p className="text-primary">45 seconds</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsCarFront className="text-primary" size={17} />} onClick={() => setSearchDuration('60')}>
                                <p className="text-primary">60 seconds</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsScooter className="text-primary" size={17} />} onClick={() => setSearchDuration('120')}>
                                <p className="text-primary">120 seconds</p>
                            </DropdownItem>
                        </Dropdown>
                        <Dropdown title={`${searchType === '' ? 'All' : searchType} typing`} className="bg-transparent text-primary text-xs lg:text-base m-auto" icon={ <BsKeyboard size={window.innerWidth > 420 ? 28 : 18} /> }>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbGoGame className="text-primary" size={17} />} onClick={() => setSearchType('')}>
                                <p className="text-primary">All</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbBrandJavascript className="text-primary" size={17} />} onClick={() => setSearchType('JavaScript')}>
                                <p className="text-primary">JavaScript</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbBrandPython className="text-primary" size={17} />} onClick={() => setSearchType('Python')}>
                                <p className="text-primary">Python</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<RiEnglishInput className="text-primary" size={17} />} onClick={() => setSearchType('English')}>
                                <p className="text-primary">English</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<GiSpain className="text-primary" size={17} />} onClick={() => setSearchType('Spanish')}>
                                <p className="text-primary">Spanish</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BsChatRightQuote className="text-primary" size={17} />} onClick={() => setSearchType('Quotes')}>
                                <p className="text-primary">Quotes</p>
                            </DropdownItem>
                        </Dropdown>
                    </div>
                    <div className="flex m-auto">
                        <Dropdown title={`${searchDevice} devices`} className="bg-transparent text-primary text-xs lg:text-base m-auto" icon={ <BiDesktop size={window.innerWidth > 420 ? 22 : 14} /> }>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbGoGame className="text-primary" size={17} />} onClick={() => setSearchDevice("All")}>
                                <p className="text-primary">All</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BiDesktop className="text-primary" size={17} />} onClick={() => setSearchDevice("PC")}>
                                <p className="text-primary">Desktop</p>
                            </DropdownItem>
                            <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<BiMobile className="text-primary" size={17} />} onClick={() => setSearchDevice("Mobile")}>
                                <p className="text-primary">Mobile</p>
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </div>
            </div>
            {isLoading && (
                <Up delay={0.2}>
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <p className="mb-2 text-primary">Loading your scores...</p>
                        <Loader />
                    </div>
                </Up>
            )}
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="mt-5 lg:w-[30%] flex-grow h-auto">
                    <CardUser
                        // @ts-ignore
                        scores={filteredScores?.length > 0 ? filteredScores : scores}
                        creatorUser={scores[0]?.creatorUser || 'Yourself'}
                        creatorImage={scores[0]?.creatorImage || avatar_image}
                        no_scores={scores.length === 0}
                    />
                </div>
                <div className="lg:w-[70%] mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {filteredScores?.slice(0, 9)?.map((score, index) => (
                        <CardDash
                            key={score.id}
                            id={score.id}
                            gameType={score.gameType}
                            gameDuration={score.gameDuration}
                            wpm={score.wpm}
                            mobile={score.mobile || false}
                            createdAt={score.createdAt}
                            creatorId={score.creatorId}
                            creatorUser={score.creatorUser}
                            index={index}
                        />
                    ))}
                    {Array.from({ length: 9 - (filteredScores?.length || 0) }).map((_, index) => (
                        <CardDashSkeleton />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default Dashboard;
