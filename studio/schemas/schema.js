import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import author from './author'
import blockContent from './blockContent'
import category from './category'
import certification from './certification'
import post from './post'
import project from './project'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    post,
    author,
    category,
    certification,
    project,
    blockContent,
  ]),
})
