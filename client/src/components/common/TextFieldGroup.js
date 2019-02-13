import React from 'react'
import classnames from 'classnames'

 const TextFieldGroup = ({
   name,
   placeholder,
   value,
   type,
   onChange,
   error,
   label,
   info,
   disabled

 })=>{
  return (
    <div className="form-group">
              <input  type={type}
                      className={classnames ('form-control form-control-lg',{
                        'is-invalid':error
                      })}
                      placeholder={placeholder} 
                      name={name} 
                      value={value}
                      onChange={onChange}
                      disabled={disabled}
                      />
              {error?(<div className="invalid-feedback">{error}</div>):null}      
            </div>
  )
}


export default TextFieldGroup
