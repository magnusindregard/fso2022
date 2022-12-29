import Entry from "./Entry"

const Persons = ({ persons, deleteEntry }) =>
    <ul>
        {persons.map(
          person => 
            <Entry 
              key={person.id} 
              person={person} 
              deleteEntry={() => deleteEntry(person.id)}
            />
        )}
    </ul>


export default Persons