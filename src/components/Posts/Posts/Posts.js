import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Form, Icon } from 'semantic-ui-react'

import { POST_LIST_QUERY } from '../../Api/post'
import { POST_FILTER_MUTATION  } from '../../Api/post'
import '../Posts.css'

import MapPosts from './MapPosts'
import MapFilteredPosts from './MapFilteredPosts'


const Posts = () => {
    const { data: postsData } = useQuery(POST_LIST_QUERY)
    const [ postFilter, { data: filteredData }] = useMutation(POST_FILTER_MUTATION)
    
    const [ searchInput, setSearchInput ] = useState('')

    //filter posts by user search bar input
    useEffect(() => {
        postFilter({ variables: { title: searchInput } })
    }, [searchInput])


    return (
        <div>
            <div className="mb-5 search-bar-container">
                <Form>
                    <Form.Field>
                        <input
                            onChange={event => setSearchInput(event.target.value)}
                            value={searchInput}
                            placeholder='Search...'
                        />
                    </Form.Field>
                </Form>
            </div>
            {(filteredData || postsData) ? (
                <div>
                    {(filteredData) ? (
                        <>
                            {/*If user has fillen search bar -> show filtere posts*/}
                            <MapFilteredPosts filteredData={filteredData} />
                        </>
                    ) : (
                        <>
                            {/*Otherwise show all posts*/}    
                            <MapPosts postsData={postsData} searchValue={searchInput} />
                        </>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default Posts
