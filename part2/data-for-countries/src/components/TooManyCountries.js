const TooManyCountries = ({numberOfCountries, filter}) => {
    const message = filter.length < 2
        ? "Type at least 2 letters to search"
        : `Too many hits - ${numberOfCountries} countries in search - keep typing.`

    return (<p>{message}</p>)
}

export default TooManyCountries