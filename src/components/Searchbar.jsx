import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { Input, Box, Text, Spinner, Flex, Close } from 'theme-ui';

function ListItem({ title, animeId, last }) {
    const { setAnimeId } = useContext(AppContext);

    return (
        <Box
            sx={{
                borderBottomWidth: last ? 0 : '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: 'secondary',
                p: 2,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
                '&:hover': { color: 'primary' },
            }}
            onClick={() => {
                setAnimeId(animeId);
            }}
        >
            <Text as="p" sx={{ fontSize: '14px' }}>
                {title}
            </Text>
        </Box>
    );
}

export default function Searchbar() {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const getData = (searchValue) => {
        fetch(' https://api.jikan.moe/v4/anime?q=' + searchValue)
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
        if (searchValue.length > 2) {
            setLoading(true);
            const timeout = setTimeout(() => {
                getData(searchValue);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [searchValue]);

    return (
        <Box sx={{ position: 'relative' }}>
            <Input
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                autofillBackgroundColor="highlight"
                placeholder="Search anime"
                sx={{
                    width: 400,
                    transition: 'border-color 0.2s ease',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    '&:focus': { outlineStyle: 'none', borderColor: 'secondary' },
                }}
            />
            {searchValue.length > 2 && (
                <>
                    <Close
                        sx={{ position: 'absolute', right: '5px', top: '5px', cursor: 'pointer' }}
                        onClick={() => setSearchValue('')}
                    />
                    <Box
                        sx={{
                            borderRadius: '5px',
                            padding: '5px 10px',
                            position: 'absolute',
                            top: 'calc(100% + 5px)',
                            left: 0,
                            right: 0,
                            background: 'sheet',
                            overflow: 'auto',
                            maxHeight: '300px',
                            boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
                        }}
                    >
                        {loading || !!error ? (
                            <Flex p={2}>
                                {loading && (
                                    <Spinner strokeWidth={2} size={30} sx={{ margin: 'auto' }} />
                                )}
                                {!!error && (
                                    <Text sx={{ color: 'muted', fontSize: '12px' }}>{error}</Text>
                                )}
                            </Flex>
                        ) : (
                            <>
                                {data.length ? (
                                    data.map((el, i) => (
                                        <ListItem
                                            title={el.title}
                                            animeId={el.mal_id}
                                            key={i}
                                            last={i + 1 === data.length}
                                        />
                                    ))
                                ) : (
                                    <Text sx={{ color: 'muted', fontSize: '14px' }}>
                                        No result found
                                    </Text>
                                )}
                            </>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}
