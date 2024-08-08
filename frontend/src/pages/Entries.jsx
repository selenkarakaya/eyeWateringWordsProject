import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEntries, reset } from "../features/entry/entrySlice";
import Spinner from "../components/Spinner";
import Entry from "../components/Entry";

function Entries() {
  const { entries, isLoading, isSuccess } = useSelector(
    (state) => state.entries
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <h1 className="text-2xl text-center mb-6">My entries</h1>
      <div className="mx-4 grid grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Entry key={entry._id} entry={entry} user={user} />
        ))}
      </div>
    </>
  );
}

export default Entries;
