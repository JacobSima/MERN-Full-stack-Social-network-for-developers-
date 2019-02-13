
import React from 'react'
import classnames from 'classnames'

 const SelectListGroup = ({
   name,
   value,
   onChange,
   error,
   options

 })=>{
   
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div className="form-group">
              <select 
                      className={classnames ('form-control form-control-lg',{
                        'is-invalid':error
                      })}
                      name={name} 
                      value={value}
                      onChange={onChange}>
                      {selectOptions}
                </select>
              {error?(<div className="invalid-feedback">{error}</div>):null}      
            </div>
  )
}

export default SelectListGroup
