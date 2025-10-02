import Select, { components } from "react-select";

export const MenuList = (props) => {
    const { children, selectProps } = props;

    const handleScroll = (event) => {
        const target = event.target;
        if (
            target.scrollHeight - target.scrollTop === target.clientHeight &&
            selectProps.onMenuScrollToBottom
        ) {
            selectProps.onMenuScrollToBottom();
        }
    };

    return (
        <components.MenuList {...props} onScroll={handleScroll}>
            {children}
        </components.MenuList>
    );
};