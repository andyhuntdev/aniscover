import { ThemeProvider } from 'theme-ui';
import { hackclub } from './themes';
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
            <ThemeProvider theme={hackclub}>
                {!!animeId && <Modal id={animeId} />}
                <Box
                    sx={{
                        filter: !!animeId ? 'blur(10px) grayscale(0.7)' : null,
                    }}
                >
                    <Header />
                    <Hero fetchUrl="https://api.jikan.moe/v4/top/anime?&filter=upcoming" />
                    <PosterCarousel
                        name="Popularity"
                        fetchUrl="https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity"
                    />
                    <PosterCarousel
                        name="Airing"
                        fetchUrl="https://api.jikan.moe/v4/top/anime?type=tv&filter=airing"
                    />
                    <PosterCarousel
                        name="Favorite"
                        fetchUrl="https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite"
                    />

                    <PosterCarousel
                        name="Movie"
                        fetchUrl="https://api.jikan.moe/v4/top/anime?type=movie&filter=favorite"
                    />
                    <PosterCarousel
                        name="OVA"
                        fetchUrl="https://api.jikan.moe/v4/top/anime?type=ova&filter=favorite"
                    />
                </Box>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
