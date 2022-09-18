import { useContext, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Badge, Box, Card, Close, Divider, Flex, Image, Spinner, Text } from 'theme-ui';
import { AppContext } from '../App';

function RatingCard({ name, rate, color }) {
    const getIcon = () => {
        switch (name) {
            default:
            case 'rank':
                return (
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                );
            case 'score':
                return (
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                        <path
                            fill-rule="evenodd"
                            d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"
                        />
                    </svg>
                );
            case 'popularity':
                return (
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                    </svg>
                );
        }
    };

    return (
        <Box
            color={color}
            bg="sheet"
            sx={{
                width: '100%',
                display: 'flex',
                borderRadius: 5,
                borderColor: color,
                borderWidth: 2,
                borderStyle: 'solid',
                p: 2,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text sx={{ fontSize: 14, fontWeight: 700, m: 0 }}>{name}</Text>
            <Text sx={{ fontSize: 32, fontWeight: 700 }}>
                {getIcon()} <Text color="text">{rate}</Text>
            </Text>
        </Box>
    );
}

export default function Modal() {

    const { animeId, setAnimeId } = useContext(AppContext);
    const [animation, setAnimation] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (animeId) {
            setAnimation(true);
            fetch('https://api.jikan.moe/v4/anime/' + animeId)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then((data) => {
                    data?.data && setData(data.data);
                })
                .catch((err) => {
                    setError('Something went wrong');
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [animeId]);

    return (
        <Flex
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 10,
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: animation ? 1 : 0,
                transform: animation ? 'translateY(0)' : 'translateY(-20%)',
            }}
        >
            <Box
                sx={{
                    width: ['100%', '100%', '1000px'],
                    height: ['100vh', '100vh', '80vh'],
                    position: 'relative',
                }}
            >
                <Card sx={{ height: '100%', padding: '0!important' }}>
                    <Close
                        sx={{ position: 'absolute', top: 2, right: 2, cursor: 'pointer' }}
                        onClick={() => {
                            setAnimation(false);
                            setTimeout(() => {
                                setAnimeId(null);
                            }, 300);
                        }}
                    />
                    {loading || !!error ? (
                        <Flex
                            sx={{
                                height: '100%',
                            }}
                        >
                            {loading && <Spinner strokeWidth={2} sx={{ margin: 'auto' }} />}
                            {!!error && (
                                <Text sx={{ margin: 'auto', color: 'muted' }}>{error}</Text>
                            )}
                        </Flex>
                    ) : (
                        <Box sx={{ overflow: 'auto', p: 4, height: '100%' }}>
                            {/* heading */}
                            <Box mb={3}>
                                <Text variant="headline" as="h3" mt={0} mb={1}>
                                    {data.title_english ? data.title_english : data.title}
                                </Text>
                                <Text
                                    variant="subheadline"
                                    as="h4"
                                    sx={{ color: 'secondary' }}
                                    mb={2}
                                >
                                    {!!data.title ? data.title : data.title_english}
                                </Text>
                                <Text variant="caption" as="p" sx={{ color: 'secondary', mb: 2 }}>
                                    {data.year} | {data.rating}
                                </Text>
                                <Box>
                                    {data?.demographics[0]?.name && <Badge mr={2}>{data?.demographics[0]?.name}</Badge>}
                                    {data.genres.map((el, i) => (
                                        <Badge bg="secondary" key={i} mr={2}>
                                            {el.name}
                                        </Badge>
                                    ))}
                                </Box>
                            </Box>
                            <Flex mb={3} sx={{ flexDirection: ['column', 'row'] }}>
                                <Image src={data.images.webp.image_url} />
                                <YouTube
                                    style={{ flex: 1, background: '#000' }}
                                    videoId={data.trailer.youtube_id}
                                    opts={{
                                        playerVars: {
                                            controls: 0,
                                            rel: 0,
                                            showInfo: 0,
                                        },
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </Flex>
                            <Text variant="subheadline" as="h5">
                                Rates
                            </Text>
                            <Flex
                                sx={{ gap: 3, mb: 4, flexDirection: ['column', 'column', 'row'] }}
                            >
                                <RatingCard name="score" rate={data.score + '/10'} color="green" />
                                <RatingCard
                                    name="rank"
                                    rate={data.rank}
                                    icon="star"
                                    color="orange"
                                />
                                <RatingCard name="popularity" rate={data.popularity} color="blue" />
                            </Flex>
                            <Flex sx={{ gap: 4, flexDirection: ['column', 'column', 'row'] }}>
                                <Box sx={{ width: ['100%', '100%', '250px'], fontSize: 14 }}>
                                    <Text variant="subheadline" as="h5">
                                        General info
                                    </Text>
                                    <Divider sx={{borderColor: 'muted'}}/>
                                    <Text>Type: </Text>
                                    <Text>{data.type}</Text>
                                    <Divider sx={{borderColor: 'muted'}}/>
                                    <Text>Source: </Text>
                                    <Text>{data.source}</Text>
                                    <Divider sx={{borderColor: 'muted'}}/>
                                    <Text>Episodes: </Text>
                                    <Text>{data.episodes}</Text>
                                    <Divider sx={{borderColor: 'muted'}}/>
                                    <Text>Status: </Text>
                                    <Text>{data.status}</Text>
                                    <Divider sx={{borderColor: 'muted'}}/>
                                    <Text>Duration: </Text>
                                    <Text>{data.duration}</Text>
                                    <Divider sx={{borderColor: 'muted'}}/>
                                </Box>
                                <Box sx={{ width: '100%' }}>
                                    <Text as="h5" variant="subheadline">
                                        Synopsis
                                    </Text>
                                    <Text
                                        dangerouslySetInnerHTML={{ __html: data.synopsis }}
                                        as="p"
                                    ></Text>
                                </Box>
                            </Flex>
                        </Box>
                    )}
                </Card>
            </Box>
        </Flex>
    );
}
