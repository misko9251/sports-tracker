import React from 'react'

function AddTeam(props) {

  return (
    <div className={`add-team-container ${props.isActive ? 'active' : ''}`}>
        <span onClick={props.onClose}>X</span>
        <section>
            <form className='add-team-form'>
            <h1>Add New Team</h1>
                <label>Team Name</label>
                <input 
                type='text'
                placeholder="What's your team name?"
                />
                <hr></hr>
                <div className='sport-form-details'>
                    <div className='sport-select-container1'>
                        <label>Sport</label>
                        <select>
                            <option>Hockey</option>
                            <option>Baseball</option>
                            <option>Softball</option>
                            <option>Football</option>
                            <option>Soccer</option>
                            <option>Basketball</option>
                            <option>Lacrosse</option>
                            <option>Volleyball</option>
                            <option>Bowling</option>
                        </select>
                    </div>
                    <div className='sport-select-container2'>
                        <label>Team type</label>
                        <select>
                            <option>Travel</option>
                            <option>Rec/Local</option>
                            <option>School</option>
                        </select>
                    </div>
                </div>
                <label>Age</label>
                <select>
                    <option>Under 13</option>
                    <option>Between 13-18</option>
                    <option>Over 18</option>
                </select>
                <button className='submit-new-team-btn'>Submit</button>
            </form>
        </section>
    </div>
  )
}

export default AddTeam