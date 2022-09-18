import { ThemeProvider } from 'theme-ui';
import { theme } from './themes';
import Header from './components/Header';
import Hero from './components/Hero';
import Modal from './components/Modal';
import PosterCarousel from './components/PosterCarousel';
import { Box } from 'theme-ui';
import './App.css';
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext({});

function App() {
    const [animeId, setAnimeId] = useState(null);

    const [airingLoad, setAiringLoad] = useState(false);
    const [favLoad, setFavLoad] = useState(false);
    const [movieLoad, setMovieLoad] = useState(false);
    const [ovaLoad, setOvaLoad] = useState(false);

    useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }, []);

    useEffect(() => {
        if (!!animeId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.removeAttribute('style');
        }
    }, [animeId]);

    return (
        <AppContext.Provider
            value={{
                animeId,
                setAnimeId,
            }}
        >
            <ThemeProvider theme={theme}>
                {!!animeId && <Modal id={animeId} />}
                <Box
                    sx={{
                        filter: !!animeId ? 'blur(10px) grayscale(0.7)' : null,
                    }}
                >
                    <Header />
                    <Hero fetchUrl="https://api.jikan.moe/v4/top/anime?&filter=upcoming" />
                    <PosterCarousel
                        loadCallBack={() => {
                            setAiringLoad(true);
                        }}
                        name="Popularity"
                        fetchUrl="https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity"
                    />
                    {airingLoad && (
                        <PosterCarousel
                            loadCallBack={() => {
                                setFavLoad(true);
                            }}
                            name="Airing"
                            fetchUrl="https://api.jikan.moe/v4/top/anime?type=tv&filter=airing"
                        />
                    )}

                    {favLoad && (
                        <PosterCarousel
                            loadCallBack={() => {
                                setMovieLoad(true);
                            }}
                            name="Favorite"
                            fetchUrl="https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite"
                        />
                    )}

                    {movieLoad && (
                        <PosterCarousel
                            loadCallBack={() => {
                                setOvaLoad(true);
                            }}
                            name="Movie"
                            fetchUrl="https://api.jikan.moe/v4/top/anime?type=movie&filter=favorite"
                        />
                    )}
                    {ovaLoad && (
                        <PosterCarousel
                            name="OVA"
                            fetchUrl="https://api.jikan.moe/v4/top/anime?type=ova&filter=favorite"
                        />
                    )}
                </Box>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
