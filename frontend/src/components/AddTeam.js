import React from 'react'

function AddTeam(props) {

  return (
    <div className={`add-team-container ${props.isActive ? 'active' : ''}`}>
        <span onClick={props.onClose}>X</span>
        <section>
            <form className='add-team-form'>
            <label>Team Name</label>
                <input 
                type='text'
                />
                <label>Select your sport</label>
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
                <label>Team type</label>
                <select>
                    <option>Travel</option>
                    <option>Rec/Local</option>
                    <option>School</option>
                </select>
                <label>Age</label>
                <select>
                    <option>Under 13</option>
                    <option>Between 13-18</option>
                    <option>Over 18</option>
                </select>
                <button>Submit</button>
            </form>
        </section>
    </div>
  )
}

export default AddTeam