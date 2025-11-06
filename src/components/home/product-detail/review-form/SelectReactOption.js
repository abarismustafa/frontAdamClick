import React, { useState } from 'react';
import Select from 'react-select';



function SelectReactOption({colourOptions}) {
    console.log(colourOptions);
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const Checkbox = ({ children, ...props }) => (
        <label style={{ marginRight: '1em' }}>
          <input type="checkbox" {...props} />
          {children}
        </label>
      );

    if (colourOptions?.length) {
        return (
            <>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={colourOptions[0].name}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="language"
                    options={colourOptions}
                />
    
                <div
                    style={{
                        color: 'hsl(0, 0%, 40%)',
                        display: 'inline-block',
                        fontSize: 12,
                        fontStyle: 'italic',
                        marginTop: '1em',
                        display: "none"
                    }}
                >
                    <Checkbox
                        checked={isClearable}
                        onChange={() => setIsClearable((state) => !state)}
                    >
                        Clearable
                    </Checkbox>
                    <Checkbox
                        checked={isSearchable}
                        onChange={() => setIsSearchable((state) => !state)}
                    >
                        Searchable
                    </Checkbox>
                    <Checkbox
                        checked={isDisabled}
                        onChange={() => setIsDisabled((state) => !state)}
                    >
                        Disabled
                    </Checkbox>
                    <Checkbox
                        checked={isLoading}
                        onChange={() => setIsLoading((state) => !state)}
                    >
                        Loading
                    </Checkbox>
                    <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
                        RTL
                    </Checkbox>
                </div>
            </>
        )
    }
}
export default SelectReactOption