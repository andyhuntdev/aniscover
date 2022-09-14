import React from 'react';
import { Flex, NavLink, Button, Box, Text, Input } from 'theme-ui';
import ColorSwitcher from './ColorSwitcher';
import Searchbar from './Searchbar';

export default function Header() {
    return (
        <>
            <Box sx={{ height: '72px' }}></Box>
            <Flex
                as="header"
                sx={{
                    justifyContent: 'space-between',
                    bg: 'sunken',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                }}
                p="3"
            >
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                    <div>
                        <NavLink href="/">
                            <Text as="h1" variant="headline" color="primary" m={0}>
                                Aniscover
                            </Text>
                        </NavLink>
                    </div>
                    <Box sx={{ display: ['none', 'none', 'block'] }}>
                        <Searchbar/>
                    </Box>
                </Flex>
                <Box sx={{ display: 'flex', placeItems: 'center' }}>
                    <Button py={1} variant="outline" color="secondary" mr={2}>
                        Github
                    </Button>
                    <ColorSwitcher />
                </Box>
            </Flex>
            <Box sx={{ display: ['block', 'block', 'none'], p: 3, pb: 0 }}>
                <Searchbar/>
            </Box>
        </>
    );
}
