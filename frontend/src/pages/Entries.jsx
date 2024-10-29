import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEntries, reset } from "../features/entry/entrySlice";
import Spinner from "../components/Spinner";
import Entry from "../components/Entry";

function Entries() {
  const dispatch = useDispatch();

  const { entries, isLoading, isSuccess } = useSelector(
    (state) => state.entries
  );
  const { user } = useSelector((state) => state.auth);

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
    <div className="card-list grid lg:grid-cols-1 gap-4">
      {entries.map((entry) => (
        <Entry key={entry._id} entry={entry} user={user} />
      ))}
    </div>
  );
}

export default Entries;
