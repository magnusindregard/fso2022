const TextInput = ({ name, handler, value }) => 
    <div>
        {name}: <input onChange={handler} value={value} />
    </div>

export default TextInput