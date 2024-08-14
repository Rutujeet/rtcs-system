import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

// Functional component to display loading skeletons for chat
const ChatLoading = () => {
    // Number of skeletons to render
    const skeletonCount = 12;

    return (
        <Stack>
            {/* Render multiple Skeleton components */}
            {Array.from({ length: skeletonCount }, (_, index) => (
                <Skeleton key={index} height="45px" />
            ))}
        </Stack>
    );
};

export default ChatLoading;