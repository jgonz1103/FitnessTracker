const client = require("./client");
const { addActivityToRoutine } = require("./routine_activities");

// database functions
async function getAllActivities() {
  try {
    const {rows: activityId} = await client.query(`
    SELECT id
    FROM activities
    `);
    const posts = await Promise.all(activityId.map(
        post=> getActivityById (post.id)
    ));
    return activities;
} catch (error) {
    throw error;
}
}

async function getActivityById(id) {
  try {
    const { rows: activityIds } = await client.query(`
    SELECT id
    FROM activities
    WHERE "authorId"=${userId};
  `);
  const activities = await Promise.all(activityIds.map(
    activity => getActivityById(activity.id)
  ));
    return activities;
} catch (error) {
    throw error;
}
}

async function getActivityByName(name) {
  try {
    const { rows: activityIds } = await client.query(`
      SELECT activities.id
      FROM activities
      JOIN  routine_activities ON activities.id=routine_activities."activityId"
      JOIN activities ON activities.id=routine_activities."activityId"
      WHERE activities.name=$1;
    `, [name]);

    return await Promise.all(activityIds.map(
      activity => getActivityById(activity.id)
    ));
  } catch (error) {
    throw error;
  }
}

// select and return an array of all activities
async function attachActivitiesToRoutines(routines) {
  try {
    const createActivityRoutinePromises = routineActivies.map((routines) => {
        return createActivitiesRoutines(activityId, routine.id);
    });
    await Promise.all(createActivityRoutinePromises);
} catch (error) {
    throw error;
}
}

// return the new activity
async function createActivity({ name, description }) {
  try {
    const {
        rows: [activities],
    } = await client.query(
        `
    INSERT INTO activities("activityId", name, description)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
        [activityId, name, description]
    );
    const routineActivities = await createActivities(routines);
    return await addActivityToRoutine(activities.id, routineActivies);
} catch (error) {
    throw error;
}
}

// don't try to update the id
// do update the name and description
// return the updated activity
async function updateActivity({ id, ...fields }) {
  const setString = Object.keys(fields)
  .map((key, index) => `"${key}"=$${index + 1}`)
  .join(", ");

if (setString.length === 0) return;

try {
  const {
      rows: [activity],
  } = await client.query(
      `
      UPDATE Activity
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
  `,
      Object.values(fields)
  );

  return user;
} catch (error) {
  throw error;
}

}


module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
}
