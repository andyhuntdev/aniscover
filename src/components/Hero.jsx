import { Flex, Card, Image, Box, Text, Badge, Spinner } from 'theme-ui';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import YouTube from 'react-youtube';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Keyboard } from 'swiper';

import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';

function HeroSlide({ slide }) {
    const [hover, setHover] = useState(false);
    const [playTrailer, setPlayTrailer] = useState(false);
    const { setAnimeId } = useContext(AppContext);

    useEffect(() => {
        if (hover) {
            const timeoutEntry = setTimeout(() => {
                setPlayTrailer(true);
            }, 2000);
            return () => {
                clearTimeout(timeoutEntry);
            };
        } else {
            const timeoutExit = setTimeout(() => {
                setPlayTrailer(false);
            }, 2000);
            return () => {
                clearTimeout(timeoutExit);
            };
        }
    }, [hover]);

    const swiper = useSwiper();

    return (
        <Card
            id={slide.mal_id}
            mb={4}
            p={0}
            variant="primary"
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={() => {
                setAnimeId(slide.mal_id);
            }}
            sx={{
                height: ['50vw', '50wv', '33vw'],
                width: '100%',
                padding: '0!important',
                position: 'relative',
                display: 'flex',
                cursor: 'pointer',
            }}
        >
            <Flex p={4}>
                <Flex
                    sx={{
                        zIndex: 2,
                        position: 'relative',
                        display: ['none', 'none', 'flex'],
                        width: [null, null, '17vw'],
                        marginTop: 'auto',
                    }}
                >
                    <Image src={slide.images.jpg.image_url} width="100%" />
                </Flex>

                <Flex
                    sx={{
                        zIndex: 2,
                        position: 'relative',
                        pl: 4,
                        flexDirection: 'column',
                        marginTop: 'auto',
                        width: [null, null, '50vw'],
                    }}
                >
                    <Text variant="title" as="h2" sx={{ color: 'white' }} mb={3}>
                        {slide.title_english ? slide.title_english : slide.title}
                    </Text>
                    <Box mb={3} mt={0}>
                        {slide.demographics.map((el, i) => (
                            <Badge key={i} mr={2}>
                                {el.name}
                            </Badge>
                        ))}
                        {slide.genres.map((el, i) => (
                            <Badge key={i} mr={2} bg="secondary">
                                {el.name}
                            </Badge>
                        ))}
                    </Box>
                    {!!slide.episodes && (
                        <Text variant="headline" as="h3" sx={{ color: 'smoke', mb: 2, mt: 0 }}>
                            {slide.episodes + ' episodes'}
                        </Text>
                    )}
                    {!!slide?.aired?.string && (
                        <Text variant="subheadline" as="h4" sx={{ color: 'muted', mt: 0, mb: 2 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg>{' '}
                            {slide.aired.string.replace('to ?', '')}
                        </Text>
                    )}
                    {slide?.synopsis?.length < 100 && (
                        <Text as="p" sx={{ color: 'smoke', m: 0 }}>
                            {slide.synopsis}
                        </Text>
                    )}
                </Flex>
            </Flex>

            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: 1,
                    top: 0,
                    left: 0,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: (theme) =>
                            `linear-gradient(90deg,  ${theme.colors.darker} 40%, rgba(0,0,0,0) 70%);`,
                    }}
                ></Box>
                {playTrailer ? (
                    <Box
                        pb={['50vw', '50wv', '33vw']}
                        sx={{
                            width: '60%',
                            marginLeft: '40%',
                            zIndex: -1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bg: 'dark',
                        }}
                    >
                        <YouTube
                            title="trailer"
                            videoId={slide.trailer.youtube_id}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                transform: 'scale(1.25)',
                            }}
                            opts={{
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    rel: 0,
                                    showInfo: 0,
                                },
                                width: '100%',
                                height: '100%',
                            }}
                            onEnd={() => {
                                swiper.slideNext();
                            }}
                        />
                    </Box>
                ) : (
                    <Image
                        src={slide.trailer.images.maximum_image_url}
                        sx={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'contain',
                            objectPosition: 'right',
                        }}
                    />
                )}
            </Box>
        </Card>
    );
}

export default function Hero({ fetchUrl }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = () => {
        fetch(fetchUrl)
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
    };

    useEffect(() => {
        if (!!fetchUrl) {
            getData();
        }
    }, []);

    return (
        <Flex px={3} pt={3}>
            {loading || !!error ? (
                <Card
                    mb={4}
                    p={0}
                    variant="primary"
                    sx={{
                        height: ['50vw', '50wv', '33vw'],
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {loading && <Spinner strokeWidth={2} size={70} />}
                    {!!error && <Text sx={{ color: 'muted' }}>{error}</Text>}
                </Card>
            ) : (
                <Swiper
                    style={{
                        '--swiper-theme-color': 'var(--theme-ui-colors-primary)',
                        '--swiper-pagination-bullet-inactive-color':
                            'var(--theme-ui-colors-placeholder)',
                    }}
                    centeredSlides={true}
                    slidesPerView={1}
                    speed={500}
                    loop={true}
                    autoplay={{
                        delay: 8000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) =>
                            `<span class="${className}" style="border-radius: 0.1rem; width: 2.5rem; height: 0.5rem"></span>`,
                    }}
                    modules={[Autoplay, Pagination, Keyboard]}
                >
                    {data.map((el, i) => (
                        <SwiperSlide key={i}>
                            <HeroSlide slide={el} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </Flex>
    );
}
