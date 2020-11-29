import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Form } from 'semantic-ui-react'

import { POST_FILTER_MUTATION  } from '../../Api/post'
import '../Posts.css'

import MapPosts from './MapPosts'


const Posts = () => {
    const [ postFilter, { data: filteredData }] = useMutation(POST_FILTER_MUTATION)
    const [ searchInput, setSearchInput ] = useState('')
   
    // Filter posts by user search bar input
    useEffect(() => {
        const filterPost = async () => {
            await postFilter({ variables: { title: searchInput } })
        }
        filterPost()
    }, [searchInput, postFilter])
   
    return (
        <div>
            <div className="mb-5 search-bar-container">
                <Form>
                    <Form.Field>
                        <input
                            onChange={event => setSearchInput(event.target.value)}
                            value={searchInput}
                            placeholder='Search...'
                            maxLength="100"
                        />
                    </Form.Field>
                </Form>
            </div>
            {(filteredData) ? (
                <div>
                    {(filteredData) ? (
                        <>
                            {/*If user has fillen search bar -> shows filteredPosts*/}
                            <MapPosts 
                                filteredData={filteredData} 
                                searchInput={searchInput} 
                            />
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}

export default Posts
