export const getData = async (callback) => {
  try {
    const result = await callback()
  } catch (error) {
    throw new Error('Error fetching callback', error)
  }
}