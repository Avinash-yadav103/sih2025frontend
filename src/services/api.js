import supabase from '../utils/supabase';

/**
 * Generalized function to fetch data from any Supabase table
 * @param {string} tableName - The name of the table to fetch data from
 * @param {object} options - Query options (select, filters, etc.)
 * @returns {Promise} - Promise resolving to the fetched data
 */
export const fetchData = async (tableName, options = {}) => {
  try {
    let query = supabase.from(tableName).select(options.select || '*');

    // Apply filters if provided
    if (options.filters) {
      options.filters.forEach(filter => {
        query = query.filter(filter.column, filter.operator, filter.value);
      });
    }

    // Apply ordering if provided
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { 
        ascending: options.orderBy.ascending 
      });
    }

    // Apply pagination if provided
    if (options.pagination) {
      query = query.range(
        options.pagination.from, 
        options.pagination.to
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Supabase error for table ${tableName}:`, error);
      
      if (error.code === '42501') {
        throw new Error(`Permission denied for table ${tableName}. Please check your Supabase RLS policies.`);
      }
      
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching data from ${tableName}:`, error);
    throw error;
  }
};

/**
 * Insert data into a Supabase table
 * @param {string} tableName - The name of the table
 * @param {object|array} data - The data to insert
 * @returns {Promise} - Promise resolving to the inserted data
 */
export const insertData = async (tableName, data) => {
  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();

    if (error) throw error;
    
    return insertedData;
  } catch (error) {
    console.error(`Error inserting data into ${tableName}:`, error);
    throw error;
  }
};

/**
 * Update data in a Supabase table
 * @param {string} tableName - The name of the table
 * @param {object} data - The data to update
 * @param {object} match - The match condition
 * @returns {Promise} - Promise resolving to the updated data
 */
export const updateData = async (tableName, data, match) => {
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .match(match)
      .select();

    if (error) throw error;
    
    return updatedData;
  } catch (error) {
    console.error(`Error updating data in ${tableName}:`, error);
    throw error;
  }
};

/**
 * Delete data from a Supabase table
 * @param {string} tableName - The name of the table
 * @param {object} match - The match condition
 * @returns {Promise} - Promise resolving to the deleted data
 */
export const deleteData = async (tableName, match) => {
  try {
    const { data: deletedData, error } = await supabase
      .from(tableName)
      .delete()
      .match(match)
      .select();

    if (error) throw error;
    
    return deletedData;
  } catch (error) {
    console.error(`Error deleting data from ${tableName}:`, error);
    throw error;
  }
};