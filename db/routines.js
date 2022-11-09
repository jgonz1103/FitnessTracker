const client = require('./client');

async function getRoutineById(id){
  try {
    const {rows: [routine]} = await client.query(`
    SELECT *
    FROM routines
    WHERE id=$1;
    `, [routinesId]);

    if (!routine){
        throw {
            name:'routineNotFound', 
            message:'There is no routine with that ID'
        }
    }

    const {rows: routines} = await client.query(`
    SELECT routine.*
    FROM routines
    JOIN activities_routine ON routine.id=activities_routine."routinesId"
    WHERE post_tags."postId"=$1
    `, [postId])

    activities.routine = routines;

    return routines;
    } catch (error) {
        throw error;   
    }
}

async function getRoutinesWithoutActivities(){
}

async function getAllRoutines() {
}

async function getAllRoutinesByUser({username}) {
}

async function getPublicRoutinesByUser({username}) {
}

async function getAllPublicRoutines() {
}

async function getPublicRoutinesByActivity({id}) {
}

async function createRoutine({creatorId, isPublic, name, goal}) {
}

async function updateRoutine({id, ...fields}) {
}

async function destroyRoutine(id) {
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
}