import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { ScoreSchema } from "@/schema/score.schema";
import { FilterScoreInput } from "@/schema/score.schema";
import Loader from "@/motions/loader";
import Card from "@/components/card";
import ClassificationLayout from "@/layout/classification";
import Alert from "@/ui/alert";
import { Button, Input } from "@/ui";
import { Dropdown, DropdownItem } from "@/ui/dropdown";
import { BiCodeAlt, BiDesktop, BiMobile } from "react-icons/bi";
import { BsAlarm, BsRocketTakeoff, BsAirplane, BsCarFront, BsScooter, BsKeyboard, BsChatRightQuote } from "react-icons/bs";
import { GiSpain } from "react-icons/gi";
import { RiEnglishInput } from "react-icons/ri";
import { TbGoGame, TbBrandJavascript, TbBrandPython } from "react-icons/tb";
import CardDashSkeleton from "@/components/carddash/skeleton";
import Up from "@/motions/up";

const Classification = () => {
    const { register } = useForm<FilterScoreInput>();
    const [scores, setScores] = useState<ScoreSchema[]>([]);
    const [filteredScores, setFilteredScores] = useState<ScoreSchema[]>(scores);
    const [searchScores, setSearchScores] = useState("");
    const [searchTime, setSearchTime] = useState("all_time");
    const [searchType, setSearchType] = useState("");
    const [searchDuration, setSearchDuration] = useState("0");
    const [searchDevice, setSearchDevice] = useState("All");

    const avatar_image = "/img/avatar.png";
    const { data: scoresData, isLoading, error } = trpc.links.getAllScores.useQuery();

    if (error) {
        return (
            <Alert>
                <p>{error.message}</p>
            </Alert>
        );
    }

    useEffect(() => {
        const filt_scores = scoresData?.filter((score) => {
            console.log(searchScores);
            let type_scores = score.creatorUser.toLowerCase().includes(searchScores.toLowerCase());
            type_scores = type_scores && score.gameType.toLowerCase().includes(searchType.toLowerCase());
            switch(searchDuration) {
                case '30':
                    type_scores = type_scores && score.gameDuration === '30';
                    break;

                case '45':
                    type_scores = type_scores && score.gameDuration === '45';
                    break;

                case '60':
                    type_scores = type_scores && score.gameDuration === '60';
                    break;

                case '120':
                    type_scores = type_scores && score.gameDuration === '120';
                    break;

                default:
                    break;
            }

            switch(searchDevice) {
                case "PC":
                    type_scores = type_scores && score.mobile === false;
                    break;

                case "Mobile":
                    type_scores = type_scores && score.mobile === true;
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
    }, [scores, searchScores, searchTime, searchType, searchDuration, searchDevice]);

    if (!scoresData) {
        return (
            <div className="mt-8 flex flex-col items-center justify-center">
                <p className="mb-2 text-primary">Loading everyone scores...</p>
                <Loader />
            </div>
        );
    }

    if (scores.length === 0 && scoresData.length > 0) {
        setScores(scoresData as ScoreSchema[]);
    }

    return (
        <ClassificationLayout>
            {window?.innerWidth > 420 ? (
                <div className="flex space-between my-4">
                    <div className="flex gap-8 w-2/3">
                        <div className="flex gap-2 m-auto">
                            <Button
                                className={searchTime === 'all_time' ? "bg-transparent text-orange-400" : "bg-transparent text-primary"}
                                icon={<BiCodeAlt size={26} />}
                                onClick={() => { setSearchTime('all_time') }}
                            >
                                All time
                            </Button>
                            <Button
                                className={searchTime === 'all_time' ? "bg-transparent text-primary" : "bg-transparent text-orange-400"}
                                icon={<BiCodeAlt size={26} />}
                                onClick={() => { setSearchTime('last_day') }}
                            >
                                Last day
                            </Button>
                        </div>
                        <div className="flex gap-2 m-auto">
                            <Dropdown title={`Duration ${searchDuration === '0' ? 'all' : searchDuration}`} className="bg-transparent text-primary m-auto mt-1" icon={ <BsAlarm size={22} /> }>
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
                            <Dropdown title={`${searchType === '' ? 'All' : searchType} typing`} className="bg-transparent text-primary m-auto" icon={ <BsKeyboard size={28} /> }>
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
                            <Dropdown title={`${searchDevice === '' ? 'All' : searchDevice} devices`} className="bg-transparent text-primary m-auto" icon={ <BiDesktop size={22} /> }>
                                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbGoGame className="text-primary" size={17} />} onClick={() => setSearchDevice("")}>
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
                    <div className="w-1/3">
                        <Input
                            id="filter"
                            type="text"
                            placeholder="Search user..."
                            {...register("filter")}
                            onChange={(e) => { setSearchScores(e.target.value) }}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col my-4">
                    <div className="flex gap-0 w-full">
                        <div className="flex gap-0 m-auto">
                            <Button
                                className={searchTime === 'all_time' ? "bg-transparent text-orange-400 text-xs" : "bg-transparent text-primary text-xs"}
                                icon={<BiCodeAlt size={window.innerWidth > 420 ? 26 : 14} />}
                                onClick={() => { setSearchTime('all_time') }}
                            >
                                All time
                            </Button>
                            <Button
                                className={searchTime === 'all_time' ? "bg-transparent text-primary text-xs" : "bg-transparent text-orange-400 text-xs"}
                                icon={<BiCodeAlt size={window.innerWidth > 420 ? 26 : 14} />}
                                onClick={() => { setSearchTime('last_day') }}
                            >
                                Last day
                            </Button>
                        </div>
                        <div className="flex gap-0 m-auto">
                            <Dropdown title={`Duration ${searchDuration === '0' ? 'all' : searchDuration}`} className="bg-transparent text-primary text-xs m-auto mt-1" icon={ <BsAlarm size={window.innerWidth > 420 ? 22 : 14} /> }>
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
                            <Dropdown title={`${searchType === '' ? 'All' : searchType} typing`} className="bg-transparent text-primary text-xs m-auto" icon={ <BsKeyboard size={window.innerWidth > 420 ? 28 : 18} /> }>
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
                            <Dropdown title={`${searchDevice === '' ? 'All' : searchDevice} devices`} className="bg-transparent text-primary text-xs m-auto" icon={ <BiDesktop size={window.innerWidth > 420 ? 22 : 14} /> }>
                                <DropdownItem className="bg-background hover:bg-gray-500 text-primary" icon={<TbGoGame className="text-primary" size={17} />} onClick={() => setSearchDevice("")}>
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
                    <div className="w-full">
                        <Input
                            id="filter"
                            type="text"
                            placeholder="Search user..."
                            {...register("filter")}
                            onChange={(e) => { setSearchScores(e.target.value) }}
                        />
                    </div>
                </div>
            )}
            {isLoading && (
                <Up delay={0.2}>
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <p className="mb-2 text-primary">Loading everyone scores...</p>
                        <Loader />
                    </div>
                </Up>
            )}
            {scores && (
                <>
                    <div className="mt-5 grid gap-5 grid-cols-1 lg:grid-cols-3">
                        {filteredScores?.length > 0 ?
                            filteredScores?.slice(0, 3).map((score, index) => (
                                <Card
                                    key={score.id}
                                    id={score.id}
                                    gameType={score.gameType}
                                    gameDuration={score.gameDuration}
                                    wpm={score.wpm}
                                    createdAt={score.createdAt}
                                    creatorId={score.creatorId}
                                    creatorUser={score.creatorUser}
                                    creatorImage={score.creatorImage || avatar_image}
                                    index={index}
                                    mobile={score.mobile || false}
                                />
                            )) : (
                                <div>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <CardDashSkeleton />
                                    ))}
                                </div>
                            )}
                    </div>
                    <div className="mt-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
                        {filteredScores?.slice(3, 15).map((score) => (
                            <Card
                                key={score.id}
                                id={score.id}
                                gameType={score.gameType}
                                gameDuration={score.gameDuration}
                                wpm={score.wpm}
                                createdAt={score.createdAt}
                                creatorId={score.creatorId}
                                creatorUser={score.creatorUser}
                                creatorImage={score.creatorImage || avatar_image}
                                index={4}
                                mobile={score.mobile || false}
                            />
                        ))}
                    </div>
                </>
            )}
        </ClassificationLayout>
    );
};

export default Classification;
