import { Link, Redirect } from "expo-router";
import { Button, H2, Input, ScrollView, Text, YStack } from "tamagui";
import FormField from "../../components/FormField";
import PinInput from "../../components/PinInput";
import { useUser } from "../../lib/user-provider";

export default function CreateWallet() {
  const { isWalletInitialized, setPin, pin, setName, name } = useUser();

  if (isWalletInitialized) {
    return <Redirect href="/login" />;
  }

  return (
    <ScrollView>
      <YStack gap="$8" padding="$4">
        <H2 size="$3" textAlign="center" marginBottom="$2">
          {"First, let's define a PIN for your account."}
        </H2>

        <FormField htmlFor="name" label="Your name">
          <Input
            value={name}
            onChangeText={setName}
            id="name"
            textAlign="center"
            size="$6"
            fontSize={24}
            borderWidth={2}
            borderColor="$gray5"
            focusStyle={{ borderColor: "$blue8" }}
          />
        </FormField>

        <FormField htmlFor="new-pin" label="Your PIN">
          <PinInput value={pin} onChangeText={setPin} id="new-pin" />
          {pin.length < 6 && (
            <Text color="$gray11" fontSize="$2" marginTop="$4">
              Your pin needs to be 6 characters long.
            </Text>
          )}
        </FormField>

        {pin.length === 6 && (
          <Link href="/onboarding/confirm-pin" asChild>
            <Button
              disabled={pin.length < 6 || !name}
              backgroundColor="$green8"
              fontSize="$2"
              opacity={pin.length < 6 ? 0.5 : 1}
            >
              Continue
            </Button>
          </Link>
        )}
      </YStack>
    </ScrollView>
  );
}
