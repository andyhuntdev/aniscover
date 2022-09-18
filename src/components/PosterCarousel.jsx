import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Image, Text, Card, Flex, Spinner } from 'theme-ui';
import { useEffect } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useInView } from 'react-intersection-observer';

function Poster({ el }) {
    const { setAnimeId } = useContext(AppContext);
    const [hover, setHover] = useState(false);

    return (
        <Card
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={() => {
                setAnimeId(el.mal_id);
            }}
            sx={{
                height: ['50vw', '50vw', '30vw', '20vw'],
                overflow: 'hidden',
                p: '0!important',
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            <Image
                src={el.images.webp.image_url}
                sx={{
                    width: ['33vw', '33vw', '18vw', '15vw'],
                    height: '100%',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                    transform: hover ? 'scale(1.1)' : 'scale(1)',
                }}
            />
            <Flex
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    p: 3,
                    flexDirection: 'column',
                    background: 'rgba(0,0,0,0.7)',
                    justifyContent: 'flex-end',
                    opacity: hover ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                }}
            >
                <Box
                    sx={{
                        borderStyle: 'solid',
                        borderColor: 'primary',
                        borderWidth: 1,
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        bottom: 2,
                        left: 2,
                        borderRadius: '6px',
                    }}
                ></Box>

                <Text variant="lead" as="h4" sx={{ m: '0!important', color: 'white' }}>
                    {el.title_english ? el.title_english : el.title}
                </Text>
                <Text variant="caption" as="h4">
                    {el.year}
                </Text>
            </Flex>
        </Card>
    );
}

function PosterPlaceholder({ error }) {
    return (
        <Card
            sx={{
                height: ['50vw', '50vw', '30vw', '20vw'],
                overflow: 'hidden',
                p: '0!important',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
            }}
        >
            {!!error ? (
                <Text sx={{ color: 'muted', fontSize: '11px' }}>{error}</Text>
            ) : (
                <Spinner strokeWidth={2} />
            )}
        </Card>
    );
}

export default function PosterCarousel({ name, fetchUrl, loadCallback }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

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
                !!loadCallback && loadCallback();
            });
    };

    useEffect(() => {
        if (!!fetchUrl && inView) {
            getData();
        }
    }, [inView, fetchUrl]);

    return (
        <Box px={3} pb={3} ref={ref}>
            <Text as="h4" variant="headline" sx={{ color: 'secondary' }}>
                {name}
            </Text>
            <Swiper
                style={{
                    '--swiper-theme-color': 'var(--theme-ui-colors-primary)',
                    '--swiper-pagination-bullet-inactive-color':
                        'var(--theme-ui-colors-placeholder)',
                }}
                slidesPerView={3}
                slidesPerGroup={3}
                navigation
                spaceBetween={10}
                breakpoints={{
                    992: {
                        slidesPerView: 5,

                        slidesPerGroup: 5,
                    },
                    1024: {
                        slidesPerView: 7,
                        slidesPerGroup: 7,
                        initialSlide: 3,
                    },
                }}
                speed={500}
                loop={true}
                modules={[Navigation]}
            >
                {loading || !!error
                    ? [...new Array(7)].map((el, i) => (
                          <SwiperSlide key={i}>
                              <PosterPlaceholder error={error} />
                          </SwiperSlide>
                      ))
                    : data.map((el, i) => (
                          <SwiperSlide key={i}>
                              <Poster el={el} number={i} />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </Box>
    );
}
