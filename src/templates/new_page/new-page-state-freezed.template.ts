import * as changeCase from "change-case";


export function getNewPageStateFreezedTemplate(name: string) {
  const pascalCaseName = changeCase.pascalCase(name);
  const snakeCaseName = changeCase.snakeCase(name);
  return `// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of '${snakeCaseName}_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError('ERROR');

/// @nodoc
mixin _$${pascalCaseName}State {}

/// @nodoc
abstract class $${pascalCaseName}StateCopyWith<$Res> {
  factory $${pascalCaseName}StateCopyWith(
          ${pascalCaseName}State value, $Res Function(${pascalCaseName}State) then) =
      _$${pascalCaseName}StateCopyWithImpl<$Res, ${pascalCaseName}State>;
}

/// @nodoc
class _$${pascalCaseName}StateCopyWithImpl<$Res, $Val extends ${pascalCaseName}State>
    implements $${pascalCaseName}StateCopyWith<$Res> {
  _$${pascalCaseName}StateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$_${pascalCaseName}StateCopyWith<$Res> {
  factory _$$_${pascalCaseName}StateCopyWith(
          _$_${pascalCaseName}State value, $Res Function(_$_${pascalCaseName}State) then) =
      __$$_${pascalCaseName}StateCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_${pascalCaseName}StateCopyWithImpl<$Res>
    extends _$${pascalCaseName}StateCopyWithImpl<$Res, _$_${pascalCaseName}State>
    implements _$$_${pascalCaseName}StateCopyWith<$Res> {
  __$$_${pascalCaseName}StateCopyWithImpl(
      _$_${pascalCaseName}State _value, $Res Function(_$_${pascalCaseName}State) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_${pascalCaseName}State extends _${pascalCaseName}State {
  _$_${pascalCaseName}State() : super._();

  @override
  String toString() {
    return '${pascalCaseName}State()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_${pascalCaseName}State);
  }

  @override
  int get hashCode => runtimeType.hashCode;
}

abstract class _${pascalCaseName}State extends ${pascalCaseName}State {
  factory _${pascalCaseName}State() = _$_${pascalCaseName}State;
  _${pascalCaseName}State._() : super._();
}
`;
}
