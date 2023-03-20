import React from 'react';

const InputForm = (props: any) => {
    return ( 
              <form 
              className="InputBox"
              onSubmit={props.onSubmit}
              style={{background: 'lightgray', display: 'flex', borderRadius: '15px', flexDirection:'column', padding: '10px'}}>
                {props.children}
                <br />
                <br />
                <input type="submit" value="Submit" />
            </form>
    );
}
 
export default InputForm;