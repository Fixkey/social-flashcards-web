import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { User } from "../../../models/User";
import {
  fetchUserProgress,
  updateUserProgress,
} from "../../../utils/apis/userApi";
import { progressLastUpdatedDate } from "../../Review/helpers";
import { UserContext } from "../../user/UserContext";

export function ProgressUpdate() {
  const {
    localLastUpdate,
    cloudLastUpdate,
    uploadProgress,
    downloadProgress,
    clearProgress,
  } = useHooks();

  return (
    <div>
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>OR</Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="cloud download" />
                Use progress from cloud
              </Header>
              <p>
                Last change:{" "}
                {cloudLastUpdate === null
                  ? "Never"
                  : cloudLastUpdate.toLocaleString()}
              </p>
              <Button primary onClick={downloadProgress}>
                Download from cloud
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name="cloud upload" />
                Use local storage
              </Header>
              <p>
                Last change:{" "}
                {localLastUpdate === null
                  ? "Never"
                  : localLastUpdate.toLocaleString()}
              </p>
              <Button primary onClick={uploadProgress}>
                Upload to cloud
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Button onClick={clearProgress} negative>
        Clear all progress
      </Button>
    </div>
  );
}

function useHooks() {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [localLastUpdate, setLocalLastUpdate] = useState(null);
  const [cloudProgress, setCloudProgress] = useState(null);
  const [cloudLastUpdate, setCloudLastUpdate] = useState(null);

  useEffect(() => {
    setLocalLastUpdate(progressLastUpdatedDate(user.progress));
    fetchUserProgress().then((response) => {
      if (response.error) {
        toast.error(response.message);
      } else {
        if (!response.data) {
          setCloudProgress({});
          setCloudLastUpdate(progressLastUpdatedDate({}));
        } else {
          setCloudProgress(response.data);
          setCloudLastUpdate(progressLastUpdatedDate(response.data));
        }
      }
      setLoading(false);
    });
  }, [user]);

  const uploadProgress = () => {
    updateUserProgress(user.progress).then((response) => {
      if (response.error) {
        toast.error(response.message);
      } else {
        setCloudProgress(user.progress);
        setCloudLastUpdate(progressLastUpdatedDate(user.progress));
      }
    });
  };

  const downloadProgress = () => {
    setUser(User.replaceProgress(user, cloudProgress));
  };

  const clearProgress = () => {
    updateUserProgress({}).then((response) => {
      if (response.error) {
        toast.error(response.message);
      } else {
        setCloudProgress({});
        setCloudLastUpdate(progressLastUpdatedDate({}));
        setUser(User.replaceProgress(user, {}));
      }
    });
  };

  return {
    user,
    localLastUpdate,
    loading,
    cloudLastUpdate,
    uploadProgress,
    downloadProgress,
    clearProgress,
  };
}
