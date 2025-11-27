import ChatItemSkeleton from '@/components/molecules/ChatItemSkeleton';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ChatItemSkeleton', () => {
    test('applies justify-start when isOwn = false', () => {
        const { container } = render(<ChatItemSkeleton isOwn={false} />);

        expect(container.firstChild).toHaveClass('justify-start');
    });

    test('applies justify-end when isOwn = true', () => {
        const { container } = render(<ChatItemSkeleton isOwn />);

        expect(container.firstChild).toHaveClass('justify-end');
    });

});
