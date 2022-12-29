import TextInput from "./TextInput"

const AddPersonForm = ({ onSubmit, handleNameChange, nameValue, handleNumberChange, numberValue }) => 
    <form onSubmit={onSubmit}>
        <TextInput name="Name" handler={handleNameChange} value={nameValue} />
        <TextInput name="Phone number" handler={handleNumberChange} value={numberValue} />
        <div>
          <button type="submit">add</button>
        </div>
    </form>


export default AddPersonForm