import React from 'react';

const InputForm = (props: any) => {
    return ( 
        <div className="InputBox" style={{background: 'lightgray', display: 'inline-block', borderRadius: '15px'}}>

              <form 
              style={{display:'flex', flexDirection:'column', padding: '10px'}}>
                {props.children}
              <button>Submit</button>
            </form>
          
        </div>
    );
}
 
export default InputForm;