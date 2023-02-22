import React, {useState} from 'react'

function AddTeam(props) {

    const [formData, setFormData] = useState({
        teamName: '',
        sport: 'Hockey',
        sportType: 'Travel',
        age: 'Under 13'
    })
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        const response = await fetch('http://localhost:2121/dashboard/addTeam', {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
          })
    }

    return (
      <div className={`add-team-container ${props.isActive ? 'active' : ''}`}>
          <span style={{cursor: 'pointer'}} onClick={props.onClose}>X</span>
          <section>
              <form className='add-team-form' onSubmit={onSubmit}>
              <h1>Add New Team</h1>
                  <label>Team Name</label>
                  <input 
                  type='text'
                  placeholder="What's your team name?"
                  name='teamName'
                  value={formData.teamName}
                  onChange={handleChange}
                  />
                  <hr></hr>
                  <div className='sport-form-details'>
                      <div className='sport-select-container1'>
                          <label>Sport</label>
                          <select value={formData.sport} onChange={handleChange} name="sport">
                              <option value="Hockey">Hockey</option>
                              <option value="Baseball">Baseball</option>
                              <option value="Softball">Softball</option>
                              <option value="Football">Football</option>
                              <option value="Soccer">Soccer</option>
                              <option value="Basketball">Basketball</option>
                              <option value="Lacrosse">Lacrosse</option>
                              <option value="Volleyball">Volleyball</option>
                              <option value="Bowling">Bowling</option>
                          </select>
                      </div>
                      <div className='sport-select-container2'>
                          <label>Team type</label>
                          <select value={formData.sportType} onChange={handleChange} name="sportType">
                              <option value="Travel">Travel</option>
                              <option value="Rec/Local">Rec/Local</option>
                              <option value="School">School</option>
                          </select>
                      </div>
                  </div>
                  <label>Age</label>
                  <select value={formData.age} onChange={handleChange} name="age">
                      <option value="Under 13">Under 13</option>
                      <option value="Between 13-18">Between 13-18</option>
                      <option value="Over 18">Over 18</option>
                  </select>
                  <button className='submit-new-team-btn'>Submit</button>
              </form>
          </section>
      </div>
    )
}

export default AddTeam