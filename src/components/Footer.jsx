import { Box, Text, Link } from 'theme-ui';

export default function Footer() {

    return (
        <Box
            m={3}
            pt={3}
            sx={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'muted' }}
        >
            <Text as="p" sx={{ color: 'muted', textAlign: 'center' }}>
                Designed and developed with ❤️ by{' '}
                <Link href="https://andreacaccia.com">@andyhuntdev</Link>
            </Text>
        </Box>
    );
}
