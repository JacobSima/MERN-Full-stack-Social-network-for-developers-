
import React from 'react'
import classnames from 'classnames'

 const TextAreaFieldsGroup = ({
   name,
   placeholder,
   value,
   onChange,
   error,
  

 })=>{
  return (
    <div className="form-group">
              <textarea 
                      className={classnames ('form-control form-control-lg',{
                        'is-invalid':error
                      })}
                      placeholder={placeholder} 
                      name={name} 
                      value={value}
                      onChange={onChange}
                      />
              {error?(<div className="invalid-feedback">{error}</div>):null}      
            </div>
  )
}

export default TextAreaFieldsGroup
