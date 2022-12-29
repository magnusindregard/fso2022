const Header = ({ text, level }) => {
    const ThisHeader = `h${level}`;
    return (
        <ThisHeader>{text}</ThisHeader>
    )
}
    
export default Header
