// Import the Pinecone library
import 'dotenv/config'
import { Pinecone } from '@pinecone-database/pinecone'

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY});

const cohortChatGptIndex = pc.Index('cohort-chatgpt')

async function createMemory({vectors, metadata, messageId}) {
    try {
        console.log(`🔺 Pinecone: Saving vector with ID: ${messageId}`)
        console.log(`   Content: "${metadata.content.substring(0, 50)}..."`)
        
        const result = await cohortChatGptIndex.upsert([ {
            id: messageId,
            values: vectors,
            metadata
        }])
        
        console.log(`🔺 ✅ Vector saved successfully in Pinecone!`)
        return result
    } catch (err) {
        console.error(`🔺 ❌ Pinecone save failed:`, err)
        throw err
    }
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
    try {
        console.log(`🔺 Pinecone: Querying ${limit} similar vectors...`)
        
        const data = await cohortChatGptIndex.query({
            vector: queryVector,
            topK: limit,
            filter: metadata ? { metadata } : undefined,
            includeMetadata: true
        })
        
        console.log(`🔺 ✅ Found ${data.matches?.length || 0} similar vectors in Pinecone`)
        
        return data.matches
    } catch (err) {
        console.error(`🔺 ❌ Pinecone query failed:`, err)
        throw err
    }
}

export { createMemory, queryMemory }
