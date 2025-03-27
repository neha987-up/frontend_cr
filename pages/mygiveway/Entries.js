import React from 'react'

const Entries = ({ enteries }) => {
    return (
        <div className='row'>
            {enteries?.map((x, inx) =>
                <div className='col-md-6 mb-3'>
                    <div className='myEntriesCard'>
                        <p className='entryCounting'>Entry {inx + 1}</p>
                        <h2 className='entryHeading'>#{x?.entry?.toString().padStart(4, '0')}</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Entries