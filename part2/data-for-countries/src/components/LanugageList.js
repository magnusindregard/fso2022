const LanguageList = ({ languageKeys, country }) => {
    
    return (
    <ul>
        {languageKeys.map(
            langKey => <li key={langKey}>{country.languages[langKey]}</li>
        )}
    </ul>
    )
}
export default LanguageList