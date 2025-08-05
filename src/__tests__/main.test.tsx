import ReactDOM from 'react-dom/client';

jest.mock('../App', () => () => <div>Mocked App</div>);

const renderMock = jest.fn();
const createRootMock = jest.fn(() => ({
    render: renderMock,
})) as unknown as typeof ReactDOM.createRoot;

describe('main.tsx', () => {
    beforeAll(() => {
        // @ts-ignore
        ReactDOM.createRoot = createRootMock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders App inside BrowserRouter', async () => {
        const root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);

        await import('../main');

        expect(createRootMock).toHaveBeenCalledWith(root);
        expect(renderMock).toHaveBeenCalled();
    });
});
